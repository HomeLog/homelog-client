function ContentsCaption({
  caption,
  className,
}: {
  caption: string;
  className?: string;
}) {
  return <p className={className}>{caption}</p>;
}

export default ContentsCaption;
