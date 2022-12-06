import BirthdayMonthTable from "./components/BirthdayMonthTable";

const BirthdayMonth = ({ data }) => {
  return (
    <>
      <h2 className="title">Cumpleaños del mes</h2>
      <br />
      <BirthdayMonthTable data={data} />
    </>
  );
};

export default BirthdayMonth;
