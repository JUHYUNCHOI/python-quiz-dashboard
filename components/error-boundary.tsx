"use client"

import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    // removeChild 에러 등 DOM 조작 에러는 무시하고 복구 시도
    if (error.message?.includes("removeChild") || error.message?.includes("not a child")) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-xl border">
              <div className="text-4xl mb-4">🦒</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">문제가 발생했어요</h2>
              <p className="text-gray-500 mb-6 text-sm">페이지를 새로고침하면 해결됩니다</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-colors"
              >
                새로고침
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
