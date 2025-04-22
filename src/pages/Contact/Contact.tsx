import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFilePdf } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="px-4 py-12 md:px-10 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0b1f61] mb-6">
            Do you have any question?
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-gray-100 px-4 py-3 rounded-md w-full outline-none border border-gray-200 focus:border-[#A20023] "
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-gray-100 px-4 py-3 rounded-md w-full outline-none border border-gray-200 focus:border-[#A20023] "
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="bg-gray-100 px-4 py-3 rounded-md w-full outline-none border border-gray-200 focus:border-[#A20023] "
              />
            </div>
            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full bg-gray-100 px-4 py-3 rounded-md outline-none border border-gray-200 focus:border-[#A20023] "
            ></textarea>
            <button
              type="submit"
              className="bg-[#A20023]  text-white font-semibold py-3 px-6 rounded-md hover:bg-[#A20023]  transition-all"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Office Info */}
        <div className="space-y-6">
          <OfficeCard
            title="US Office"
            address="08 W 36th St, New York, NY 10001"
            phone="+1 333 9296"
            email="contact@example.com"
          />
          <OfficeCard
            title="AU Office"
            address="100 Mainstreet Center, Sydney"
            phone="+61 333 9296"
            email="contact@example.com"
          />
        </div>
      </div>
    </section>
  );
};

type OfficeCardProps = {
  title: string;
  address: string;
  phone: string;
  email: string;
};

const OfficeCard = ({ title, address, phone, email }: OfficeCardProps) => (
  <div className="bg-white border rounded-lg shadow-sm p-6">
    <h3 className="text-lg font-semibold text-[#0b1f61] mb-4">{title}</h3>
    <ul className="space-y-2 text-gray-700 text-sm">
      <li className="flex items-start gap-2">
        <FaMapMarkerAlt className="text-[#A20023]  mt-1" />
        <span>{address}</span>
      </li>
      <li className="flex items-start gap-2">
        <FaPhoneAlt className="text-[#A20023]  mt-1" />
        <span>{phone}</span>
      </li>
      <li className="flex items-start gap-2">
        <FaEnvelope className="text-[#A20023]  mt-1" />
        <span>{email}</span>
      </li>
      <li className="flex items-start gap-2">
        <FaFilePdf className="text-[#A20023]  mt-1" />
        <span>
          <a href="#" className="text-[#A20023]  hover:underline">
            Download Brochure
          </a>
        </span>
      </li>
    </ul>
  </div>
);

export default Contact;
