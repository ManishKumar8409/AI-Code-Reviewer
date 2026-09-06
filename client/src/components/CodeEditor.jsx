import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <Editor
      height="100%"
      language={language}
      value={code}
      onChange={(value) => setCode(value || "")}
      theme="vs-dark"
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 14,
        automaticLayout: true,
        wordWrap: "on",
        scrollBeyondLastLine: false,
        padding: {
          top: 10,
          bottom: 10,
        },
      }}
    />
  );
};

export default CodeEditor;