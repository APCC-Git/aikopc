import { NextRequest, NextResponse } from 'next/server';

// OpenRouterのAPIクライアント
async function callOpenRouter(
  messages: Array<{ role: string; content: string }>,
  model: string = 'anthropic/claude-3.5-sonnet'
) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      //'HTTP-Referer': process.env.OPENROUTER_REFERER || 'http://localhost:3000',
      //'X-Title': process.env.OPENROUTER_TITLE || 'Blog AI Generator',
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `OpenRouter API error: ${response.status} ${response.statusText}. ${JSON.stringify(errorData)}`
    );
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'AI応答を生成できませんでした。';
}

export async function POST(req: NextRequest) {
  try {
    // OpenRouter APIキーの確認
    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json({ error: 'OpenRouter API key is not configured' }, { status: 500 });
    }

    const body = await req.json();
    const { feature, prompt, currentTitle, currentText, category, model } = body;

    if (!feature) {
      return NextResponse.json({ error: 'Feature is required' }, { status: 400 });
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (feature) {
      case 'title':
        systemPrompt =
          'あなたは優秀なブログライターです。魅力的で検索されやすいブログタイトルを生成してください。SEOを意識し、読者の興味を引くタイトルを作成してください。';
        userPrompt = `以下の情報を基に、魅力的なブログタイトルを1つ生成してください：

プロンプト: ${prompt}
カテゴリ: ${category || '指定なし'}
現在の本文: ${currentText ? currentText.substring(0, 500) + '...' : 'なし'}

要件:
- 30文字程度で読みやすい
- SEOキーワードを含む
- 読者の興味を引く表現`;
        break;

      case 'content':
        systemPrompt =
          'あなたは優秀なブログライターです。読みやすく有益で、SEOに最適化されたブログ記事を執筆してください。見出しを適切に使用し、読者にとって価値のある内容を提供してください。';
        userPrompt = `以下の情報を基に、ブログ記事の内容を生成してください：

プロンプト: ${prompt}
タイトル: ${currentTitle || '未設定'}
カテゴリ: ${category || '指定なし'}
既存の本文: ${currentText || 'なし'}

要件:
- Markdown形式で記事を作成
- 適切な見出し（##, ###）を使用
- SEOを意識したキーワード配置
- 読者にとって実用的で価値のある内容
- 1000文字以上の充実した内容`;
        break;

      case 'improve':
        if (!currentText) {
          return NextResponse.json(
            { error: 'Current text is required for improvement' },
            { status: 400 }
          );
        }
        systemPrompt =
          'あなたは優秀な編集者です。文章をより読みやすく、魅力的で、SEOに最適化された内容に改善してください。';
        userPrompt = `以下の文章を改善してください：

${currentText}

改善のポイント：
- 読みやすさの向上（段落分け、文章の流れ）
- 論理的で明確な構成
- SEO最適化（キーワードの自然な配置）
- エンゲージメントの向上（読者の興味を引く表現）
- 情報の正確性と価値の向上`;
        break;

      case 'summary':
        if (!currentText) {
          return NextResponse.json(
            { error: 'Current text is required for summary' },
            { status: 400 }
          );
        }
        systemPrompt =
          'あなたは優秀な要約作成者です。記事の要点を簡潔で分かりやすくまとめてください。';
        userPrompt = `以下の記事の要約を作成してください：

${currentText}

要件:
- 主要なポイントを3-5個に絞る
- 読者が記事の価値を素早く理解できる
- 150-300文字程度の適切な長さ
- 箇条書きまたは段落形式で読みやすく`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid feature' }, { status: 400 });
    }

    // 使用するモデルを決定（リクエストで指定されたもの > 環境変数 > デフォルト）
    const selectedModel = model || process.env.OPENROUTER_MODEL || 'deepseek/deepseek-r1-zero:free';

    // OpenRouter APIを呼び出し
    const aiResponse = await callOpenRouter(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      selectedModel
    );

    // レスポンスの構築
    const response: any = {};
    switch (feature) {
      case 'title':
        response.title = aiResponse.trim();
        break;
      case 'content':
        response.content = aiResponse.trim();
        break;
      case 'improve':
        response.improvedText = aiResponse.trim();
        break;
      case 'summary':
        response.summary = aiResponse.trim();
        break;
    }

    console.log(response);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI生成エラー:', error);

    // エラーの詳細をログに出力（本番環境では注意）
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }

    return NextResponse.json(
      {
        error: 'AI生成に失敗しました',
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
      },
      { status: 500 }
    );
  }
}

// GETリクエストの場合のハンドリング（オプション）
export async function GET() {
  return NextResponse.json({
    message: 'Blog AI API is running',
    features: ['title', 'content', 'improve', 'summary'],
    defaultModel: process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet',
    supportedModels: [
      'anthropic/claude-3.5-sonnet',
      'openai/gpt-4o',
      'openai/gpt-4o-mini',
      'google/gemini-pro-1.5',
      'meta-llama/llama-3.1-70b-instruct',
    ],
  });
}
