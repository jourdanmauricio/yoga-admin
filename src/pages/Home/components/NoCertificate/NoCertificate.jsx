import NoCertificateTable from "./components/NoCertificateTable";

const NoCertificate = ({ data }) => {
  return (
    <>
      <h2 className="title">Sin certificado</h2>
      <br />
      <NoCertificateTable data={data} />
    </>
  );
};

export default NoCertificate;
