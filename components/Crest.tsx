import Image from "next/image";

/**
 * Blazonul clubului. Fișierul sursă e un JPG cu fundal întunecat cu pattern,
 * așa că decupăm cercul (utilitarul `crest-clip`) ca să stea curat pe orice fundal.
 */
export function Crest({
  src = "/img/logo.jpg",
  size = 48,
  priority = false,
  className = "",
}: {
  src?: string;
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt="Blazonul AS Dan Chilom"
      width={size}
      height={size}
      priority={priority}
      className={`crest-clip shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
