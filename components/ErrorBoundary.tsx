"use client";

import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
    children: ReactNode;
    fallback: ReactNode;
}

type State = {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(`Section error ${error}`);
        console.error(`Error info: ${errorInfo}`);
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}