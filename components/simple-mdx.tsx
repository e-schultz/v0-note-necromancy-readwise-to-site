interface SimpleMdxProps {
  code: string
}

export function SimpleMdx({ code }: SimpleMdxProps) {
  return <div dangerouslySetInnerHTML={{ __html: code }} />
}
