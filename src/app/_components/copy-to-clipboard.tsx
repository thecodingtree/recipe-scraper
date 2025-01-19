import React, { useState, useCallback } from "react";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { showToastMsg } from "@/utils";

function CopyToClipboard({
  contentRef,
}: {
  contentRef?: React.RefObject<HTMLDivElement>;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    if (contentRef?.current) {
      const content = contentRef.current.innerHTML;

      const blob = new Blob([content], { type: "text/html" });
      const data = [new ClipboardItem({ [blob.type]: blob })];

      navigator.clipboard
        .write(data)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          showToastMsg("Unable to copy");
          console.log("Unable to copy recipe", err);
        });
    }
  }, [contentRef]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={copyToClipboard}
      aria-label="Copy to clipboard"
    >
      {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}

export default CopyToClipboard;
