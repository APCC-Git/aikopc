'use client';

import { DashboardBreadcrumb } from '@/components/dashboard/DashboardBreadcrumb';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { Input } from '@/components/common/ui/input';
import { Button } from '@/components/common/ui/button';
import { Textarea } from '@/components/common/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/ui/select';
import React, { useState, useEffect } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Sparkles, Wand2, RefreshCw, FileText, Settings, Brain, ChevronDown } from 'lucide-react';
import { marked } from 'marked';

type Category = {
  id: string;
  name: string;
};

type AIFeature = 'title' | 'content' | 'improve' | 'summary';

type AIModel = {
  id: string;
  name: string;
  provider: string;
};

const AI_MODELS: AIModel[] = [
  { id: 'deepseek/deepseek-chat-v3-0324:free', name: 'DeepSeek V3', provider: 'DeepSeek' },
  { id: 'deepseek/deepseek-r1-zero:free', name: 'DeepSeek R1 zero', provider: 'DeepSeek' },
  { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 flash', provider: 'Google' },
];

// マークダウンをHTMLに変換する関数
const markdownToHtml = (markdown: string): string => {
  return (
    markdown
      // 見出し
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')

      // 太字
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.*?)__/g, '<strong>$1</strong>')

      // 斜体
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/_(.*?)_/g, '<em>$1</em>')

      // インラインコード
      .replace(/`(.*?)`/g, '<code>$1</code>')

      // コードブロック
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')

      // リンク
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

      // 画像
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')

      // 水平線
      .replace(/^---$/gm, '<hr>')

      // リスト（順序なし）
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')

      // リスト（順序あり）
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')

      // 改行をpタグに変換
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.trim() === '') return '';

        // すでにHTMLタグで囲まれている場合はそのまま
        if (paragraph.match(/^<(h[1-6]|ul|ol|li|pre|hr|img)/i)) {
          return paragraph;
        }

        // リストアイテムの場合はul/olで囲む
        if (paragraph.includes('<li>')) {
          const isOrdered = /^\d+\./.test(paragraph.split('\n')[0]);
          const listTag = isOrdered ? 'ol' : 'ul';
          return `<${listTag}>${paragraph}</${listTag}>`;
        }

        // 通常の段落
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n')

      // 空のpタグを削除
      .replace(/<p><\/p>/g, '')

      // リストの修正
      .replace(/<\/li>\s*<li>/g, '</li><li>')
      //@ts-ignore
      .replace(/<p>(<[uo]l>.*?<\/[uo]l>)<\/p>/gs, '$1')
  );
};

export default function Page() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>(AI_MODELS[0].id);
  const [editorRef, setEditorRef] = useState<any>(null);

  // カテゴリの取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/blog/category', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          if (data !== null && typeof data === 'object' && 'contents' in data) {
            setCategories(data.contents as Category[]);
          }
        } else {
          alert('カテゴリの取得に失敗しました');
        }
      } catch (error) {
        console.error('カテゴリ取得エラー:', error);
        alert('カテゴリの取得に失敗しました');
      }
    };

    fetchCategories();
  }, []);

  // 投稿
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/blog/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          text: text,
          categoryId: selectedCategory?.id,
        }),
      });
      if (res.ok) {
        alert('投稿が正常に完了しました');
      } else {
        alert('投稿に失敗しました');
      }
    } catch (error) {
      console.error('投稿エラー:', error);
      alert('投稿に失敗しました');
    }
  };

  // 下書きの保存
  const saveDraft = async () => {
    try {
      const response = await fetch('/api/blog/draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, text }),
      });

      if (!response.ok) {
        alert('下書きの保存に失敗しました');
      } else {
        alert('下書きの保存に成功しました');
      }
    } catch (error) {
      console.error('下書き保存エラー:', error);
      alert('下書きの保存に失敗しました');
    }
  };

  const insertContentToEditor = (content: string, append: boolean = false) => {
    if (!editorRef) return;

    const htmlContent = markdownToHtml(content);

    if (append) {
      const currentContent = editorRef.getHTML();
      const newContent =
        currentContent === '<p></p>' || !currentContent.trim()
          ? htmlContent
          : currentContent + '<br><br>' + htmlContent;
      editorRef.commands.setContent(newContent);
      setText(newContent);
    } else {
      editorRef.commands.setContent(htmlContent);
      setText(htmlContent);
    }
  };

  const handleAiRequest = async (feature: AIFeature) => {
    if (!aiPrompt.trim() && feature !== 'improve' && feature !== 'summary') {
      alert('プロンプトを入力してください');
      return;
    }

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/blog/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feature,
          prompt: aiPrompt,
          currentTitle: title,
          currentText: text,
          category: selectedCategory?.name,
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'AI生成に失敗しました');
      }

      const data = await response.json();

      switch (feature) {
        case 'title':
          if (data.title) {
            setTitle(data.title);
          }
          break;
        case 'content':
          if (data.content) {
            insertContentToEditor(data.content, true);
          }
          break;
        case 'improve':
          if (data.improvedText) {
            insertContentToEditor(data.improvedText, false);
          }
          break;
        case 'summary':
          if (data.summary) {
            const summaryMarkdown = `\n\n## まとめ\n\n${data.summary}`;
            insertContentToEditor(summaryMarkdown, true);
          }
          break;
      }

      setAiPrompt('');
    } catch (error) {
      console.error('AI生成エラー:', error);
      alert(`AI生成に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className={'flex w-full flex-col overflow-x-hidden overflow-y-scroll'}>
      <DashboardBreadcrumb
        items={[
          { label: 'ダッシュボード', href: '/dashboard' },
          { label: 'ブログ', href: '/dashboard/blog' },
          { label: 'ブログ作成' },
        ]}
      />

      <div className="absolute z-10 h-full max-h-full w-full overflow-y-scroll p-2 md:p-6">
        {/* AI アシスタントドロップダウン */}
        <div className="fixed top-20 right-5 z-50 md:right-10">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600"
                disabled={isAiLoading}
              >
                {isAiLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    AI生成中...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI アシスタント
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="z-50 w-[320px] space-y-4 rounded-lg border bg-white p-4 shadow-xl"
                align="end"
                sideOffset={5}
              >
                <div className="flex items-center gap-2 border-b pb-2 text-lg font-semibold text-gray-800">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI アシスタント
                </div>

                {/* AI モデル選択 */}
                <div className="h-20 space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Settings className="h-4 w-4" />
                    AIモデル
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AI_MODELS.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex flex-col items-start gap-1">
                            <span className="font-medium">{model.name}</span>
                            <span className="text-xs text-gray-500">{model.provider}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full space-y-2">
                  <label className="mb-3 text-sm font-medium text-gray-700">プロンプト</label>
                  <Textarea
                    placeholder="AIに何を手伝ってもらいますか？&#10;例: 'プログラミング学習について初心者向けの記事を書いて'"
                    value={aiPrompt}
                    onChange={e => setAiPrompt(e.target.value)}
                    className="h-24 w-full resize-none text-wrap"
                    rows={5}
                  />
                </div>

                <DropdownMenu.Separator className="h-px bg-gray-200" />

                {/* AI機能ボタン */}
                <div className="space-y-2">
                  <div className="mb-2 text-sm font-medium text-gray-700">AI機能</div>

                  <div className={'grid w-full grid-cols-2 gap-1'}>
                    <DropdownMenu.Item
                      className="w-full p-0 focus:bg-transparent"
                      onSelect={e => e.preventDefault()}
                    >
                      <Button
                        onClick={() => handleAiRequest('title')}
                        disabled={isAiLoading}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                        タイトル生成
                      </Button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="w-full p-0 focus:bg-transparent"
                      onSelect={e => e.preventDefault()}
                    >
                      <Button
                        onClick={() => handleAiRequest('content')}
                        disabled={isAiLoading}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        本文生成
                      </Button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="w-full p-0 focus:bg-transparent"
                      onSelect={e => e.preventDefault()}
                    >
                      <Button
                        onClick={() => handleAiRequest('improve')}
                        disabled={isAiLoading || !text}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        文章改善
                      </Button>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className="w-full p-0 focus:bg-transparent"
                      onSelect={e => e.preventDefault()}
                    >
                      <Button
                        onClick={() => handleAiRequest('summary')}
                        disabled={isAiLoading || !text}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-left"
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        要約生成
                      </Button>
                    </DropdownMenu.Item>
                  </div>
                </div>

                {isAiLoading && (
                  <>
                    <DropdownMenu.Separator className="h-px bg-gray-200" />
                    <div className="flex items-center justify-center py-2 text-sm text-gray-600">
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      {AI_MODELS.find(m => m.id === selectedModel)?.name} で生成中...
                    </div>
                  </>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <form onSubmit={handleSubmit} className="mb-16 w-full space-y-10 md:mb-5">
          <div className="h-16 w-full"></div>

          <div className={'mt-5 w-full'}>
            <div className={'flex items-center gap-2 font-bold'}>
              タイトル
              <Button
                type="button"
                onClick={() => handleAiRequest('title')}
                disabled={isAiLoading}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-1"
              >
                <Sparkles className="h-3 w-3 text-purple-500" />
              </Button>
            </div>
            <Input
              placeholder="タイトルを入力（AIで生成も可能）"
              className={'mt-3'}
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div className={'mt-10 w-full'}>
            <div className={'flex items-center gap-2 font-bold'}>
              内容
              <Button
                type="button"
                onClick={() => handleAiRequest('content')}
                disabled={isAiLoading}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-1"
              >
                <Sparkles className="h-3 w-3 text-purple-500" />
              </Button>
            </div>
            <div className="mt-3 max-h-full w-full rounded-lg shadow-sm">
              <SimpleEditor
                setTextAction={setText}
                onEditorCreate={editor => setEditorRef(editor)}
              />
            </div>
          </div>

          <div className={'mt-5 w-full'}>
            <div className={'font-bold'}>アイキャッチ</div>
            <Input placeholder="画像アップローダーを実装予定" className={'mt-3'} />
          </div>

          <div className={'mt-5 w-full'}>
            <div className={'font-bold'}>カテゴリ</div>
            <div className="mt-3">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {selectedCategory ? selectedCategory.name : 'カテゴリを選択'}
                  </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="z-50 min-w-[200px] rounded-md bg-white p-1 shadow-lg"
                    align="start"
                  >
                    {categories.map(category => (
                      <DropdownMenu.Item
                        key={category.id}
                        className="cursor-pointer rounded px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category.name}
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>

          <div className={'flex justify-start gap-2'}>
            <Button type={'submit'}>投稿</Button>
            <Button type={'button'} variant={'outline'} onClick={saveDraft}>
              下書きに保存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
