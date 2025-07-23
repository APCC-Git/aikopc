const quickSort = `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

class QuickSort {
private:
    std::vector<int> arr;
    
    int partition(int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                std::swap(arr[i], arr[j]);
            }
        }
        std::swap(arr[i + 1], arr[high]);
        return i + 1;
    }
    
    void quickSortHelper(int low, int high) {
        if (low < high) {
            int pi = partition(low, high);
            quickSortHelper(low, pi - 1);
            quickSortHelper(pi + 1, high);
        }
    }
    
public:
    QuickSort(std::vector<int> input) : arr(input) {}
    
    void sort() {
        quickSortHelper(0, arr.size() - 1);
    }
    
    void display() {
        std::cout << "Sorted array: ";
        for (int num : arr) {
            std::cout << num << " ";
        }
        std::cout << std::endl;
    }
};

int main() {
    std::vector<int> numbers = {64, 34, 25, 12, 22, 11, 90};
    
    std::cout << "Original array: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    QuickSort sorter(numbers);
    sorter.sort();
    sorter.display();
    
    return 0;
}`;

const Patisserie = `#include <algorithm>
#include <iostream>
#include <random>
#include <tuple>
#include <vector>
using namespace std;

using ll = long long;
constexpr ll inf = 4e18;
void chmax(ll& a, ll b) { a = max(a, b); }

#define rep(i, N) for (int i = 0; i < (N); i++)

ll buf[2][100100][2][2][2];

int main() {
  int T;
  cin >> T;
  while (T--) {
    int N, K;
    cin >> N >> K;
    vector<tuple<int, int, int>> v;
    rep(i, N) {
      int x, y, z;
      cin >> x >> y >> z;
      v.emplace_back(x, y, z);
    }

    mt19937_64 rng(58);
    shuffle(begin(v), end(v), rng);

    auto dp = buf[0], nx = buf[1];
    rep(k, 2 * K + 1) rep(a, 2) rep(b, 2) rep(c, 2) {
      dp[k][a][b][c] = nx[k][a][b][c] = -inf;
    }

    dp[0][0][0][0] = 0;
    int B = 500;
    rep(n, N) {
      auto [x, y, z] = v[n];
      int L = clamp<int>(2LL * K * n / N - B, 0, 2 * K);
      int R = clamp<int>(2LL * K * n / N + B, 1, 2 * K + 1);
      for (int i = L; i < R; i++) rep(a, 2) rep(b, 2) rep(c, 2) {
          chmax(nx[i][a][b][c], dp[i][a][b][c]);
          chmax(nx[i + 1][a ^ 1][b][c], dp[i][a][b][c] + x);
          chmax(nx[i + 1][a][b ^ 1][c], dp[i][a][b][c] + y);
          chmax(nx[i + 1][a][b][c ^ 1], dp[i][a][b][c] + z);
        }
      swap(dp, nx);
    }
    cout << dp[2 * K][0][0][0] << "\\n";
  }
}`;

export const codes = [
  {
    title: 'quickSort.cpp',
    lang: 'cpp',
    code: quickSort,
  },
  {
    title: 'Patisserie.cpp',
    lang: 'cpp',
    code: Patisserie,
  },
];
