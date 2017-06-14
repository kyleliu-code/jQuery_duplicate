function DOMEval(code,doc){
    var doc = doc || document;

    var script = doc.createElement("script");
    script.text = code;

    doc.head.appendChild(script).parentNode.removeChild(script);
}