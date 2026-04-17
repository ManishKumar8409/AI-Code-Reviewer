const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="bg-[#1e293b] border border-gray-600 px-3 py-2 rounded text-white"
    >
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="react">REACTJS</option>
      <option value="node">NODEJS</option>
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="cpp">C++</option>
      <option value="c">C</option>
    </select>
  );
};

export default LanguageSelector;
