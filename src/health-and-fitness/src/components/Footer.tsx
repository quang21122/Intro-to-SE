import Github from "../assets/footer/GitHub.png";
import Facebook from "../assets/footer/Facebook.png";
import Youtube from "../assets/footer/Youtube.png";
import Instagram from "../assets/footer/Instagram.png";

export default function Footer() {
  return (
    <footer className="bg-[#212121] py-10">
      <div className="grid grid-cols-[3fr_auto_2fr] mx-auto">
        <div className="flex flex-col ml-20">
          <p className="bebas-font text-[5rem] text-[#D64141] ml-2 tracking-wide text-shadow-custom">
            HAF
          </p>
          <p className="bebas-font uppercase text-5xl text-white ml-2 tracking-wide text-shadow-custom">
            The health and fitness
          </p>
        </div>
        <div className="flex flex-col mr-20">
          <p className="text-white uppercase text-2xl font-bold tracking-widest">
            Group 4
          </p>
          <ul className="text-white text-xl space-y-1 mt-4">
            <li className="">Văn Diệp Bảo Duy</li>
            <li className="">Nguyễn Huỳnh Minh Quang</li>
            <li className="">Vũ Thái Thiện</li>
            <li className="">Trương Thuận Kiệt</li>
            <li className="">Ngô Thanh Phương Dương</li>
          </ul>
        </div>
        <div className="flex ml-auto overflow-hidden mr-10">
          <div className="mr-20">
            <ul className="flex flex-col justify-between space-y-4">
              <li className="cursor-pointer">
                <img src={Github} alt="Github" className="h-10" />
              </li>
              <li className="cursor-pointer">
                <img src={Facebook} alt="Facebook" className="h-10" />
              </li>
              <li className="cursor-pointer">
                <img src={Youtube} alt="Youtube" className="h-10" />
              </li>
              <li className="cursor-pointer">
                <img src={Instagram} alt="Instagram" className="h-10" />
              </li>
            </ul>
          </div>
          <div className="h-full w-20 overflow-hidden flex items-center justify-center">
            <p className="uppercase text-white text-4xl font-bold rotate-90">
              Hcmus <br /> 22clc01
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
