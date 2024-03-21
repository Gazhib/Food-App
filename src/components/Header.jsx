import image from "../assets/logo.jpg";
export default function Header({openModal, cartNumber}) {
  return (
    <main id="main-header">
      <div id="title">
        <img src={image} />
        <h1>REACTFOOD</h1>
      </div>
      <button onClick={openModal}>Cart {`(${cartNumber})`}</button>
    </main>
  );
}
