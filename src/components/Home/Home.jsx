
import "./home.css";
import image from "../../assets/welcome.svg";

const Home = () => {
  return (
    <section className="home-section">
      <div className="cover">
        <img src={image} alt="welcome-image" />
      </div>
      <h1>تم تسجيل الدخول بنجاح</h1>
      <div className="home-des">
        <p>
          من خلال هذا النظام يمكنك اضافه مواد و محاضرات وفرص تدريب داخل منصه
          ملازمي يمكنك التنقل بين العمليات من خلال الشريط الموجود في يسار الشاشه
        </p>
      </div>
    </section>
  );
};

export default Home;
