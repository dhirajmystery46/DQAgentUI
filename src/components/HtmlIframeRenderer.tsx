import React, { useEffect, useRef, useState } from "react";
import { getStyledIframeHtml } from "../utils";

interface Props {
  htmlContent: string | null;
  isAgentsPanelOpen?: boolean;
}

export const HtmlIframeRenderer: React.FC<Props> = ({
  htmlContent,
  isAgentsPanelOpen,
}) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const iframe = iframeRef.current;
    if (!iframe || !htmlContent) {
      setIsLoading(false);
      return;
    }

    iframe.srcdoc = getStyledIframeHtml(htmlContent);

    const updateIframeHeight = () => {
      if (iframe.contentWindow?.document.body) {
        const contentHeight =
          iframe.contentWindow.document.body.scrollHeight + 40;
        iframe.style.height = `${contentHeight}px`;
      }
    };

    iframe.onload = updateIframeHeight;
    iframe.addEventListener("load", updateIframeHeight);

    const handleLoad = () => {
      setIsLoading(false);
    };

    iframe.addEventListener("load", handleLoad);
    return () => {
      iframe.removeEventListener("load", handleLoad);
    };
  }, [htmlContent]);

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="loader">Loading...</div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="HtmlIframeRenderer Content"
        style={{
          width: isAgentsPanelOpen
            ? "calc(100vw - 720px)"
            : "calc(100vw - 500px)",
          border: "none",
          overflow: "hidden",
        }}
        sandbox="allow-scripts allow-same-origin"
        className="w-full h-full block"
      >
        <p>Your browser does not support iframes or the srcdoc attribute.</p>
      </iframe>
    </>
  );
};
