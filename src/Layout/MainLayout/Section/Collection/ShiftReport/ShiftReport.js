import style from "./ShiftReport.module.css";

export default function ShiftReport() {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12];
  return (
    <section className={style.warp}>
      <div className={style.title}>Báo cáo ca</div>
      <div className={style.elementsWarp}>
        {array.map((crr) => {
          return <ElementDoc key={crr} />;
        })}
      </div>
    </section>
  );
}

function ElementDoc() {
  return (
    <section className={style.documentWarp}>
      <div className={style.document}>
        Báo cáo CA
        <div className={style.time}>2022-09-15</div>
        <br />
        <span className={style.userName}>Ca D </span>
      </div>
    </section>
  );
}
