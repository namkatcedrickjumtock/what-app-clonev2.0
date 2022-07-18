import { Wave } from "better-react-spinkit";
import Image from "next/image";

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
};

const Loading = () => {
  return (
    <center style={{ marginTop: "15em" }}>
      <div style={{ padding: 50 }}>
        <Image
          // loader={myLoader}
          style={{ margin: "5em" }}
          height={60}
          width={100}
          src="/img/logo.png"
          alt=""
        />
      </div>
      <Wave size={30} color={"#25D366"} />
    </center>
  );
};

export default Loading;
