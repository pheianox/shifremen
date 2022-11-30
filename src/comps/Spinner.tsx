import { Component } from "solid-js"

const Spinner: Component<{ size: string; color1?: string; color2?: string }> = ({ size, color1 = "black", color2 = "#0000" }) => {
  const style = `
  width: ${size};
  aspect-ratio: 1;
  border-radius: 50%;
  background: 
    radial-gradient(farthest-side,${color1} 94%,${color2}) top/8px 8px no-repeat,
    conic-gradient(${color2} 30%,${color1});
  -webkit-mask: radial-gradient(farthest-side,${color2} calc(100% - 8px),#000 0);
  animation: spin 0.7s infinite ease-in;
`
  return <div style={style} />
}

export default Spinner
