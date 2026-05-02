"use client";

import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

type Props = {
  content: string;
  className?: string;
};

const SanitizedContent = (props: Props) => {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    (async () => {
      const sanitized = await DOMPurify.sanitize(
        "<script></script>" + props.content
      );
      setSanitized(sanitized);
    })();
  }, [props.content]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitized }}
      className={props.className}
    />
  );
};

export default SanitizedContent;
