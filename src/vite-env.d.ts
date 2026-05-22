/// <reference types="vite/client" />

// Vue type declarations for TypeScript
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}

declare module 'virtual:*' {
  const result: unknown
  export default result
}
