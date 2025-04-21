import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "How do I get started with Car Rental?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    question: "Can I rent a car with a debit card?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    question: "What kind of Car Rental do I need?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    question: "What is a rental car security deposit?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    question: "Can I cancel or modify my reservation?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
  {
    question: "Is it possible to extend my rental period?",
    answer:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-[#3DEEB7] text-sm px-3 py-1 rounded-full bg-[#93848a] inline-block mb-3">
          Do You Have
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Any Questions?
        </h2>
      </div>

      {/* FAQ Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl bg-white shadow-md transition hover:shadow-lg"
          >
            <button
              onClick={() => toggleIndex(index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center"
            >
              <span className="text-lg font-medium text-gray-800">
                {item.question}
              </span>
              {activeIndex === index ? (
                <ChevronUp className="bg-[#A20023] text-white" />
              ) : (
                <ChevronDown className="bg-[#3DEEB7] p-1 text-gray-500" />
              )}
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
