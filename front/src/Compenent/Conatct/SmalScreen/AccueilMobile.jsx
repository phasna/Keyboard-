import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import contactBg from "../../../assets/Contact/ClavierRgb.png";

const ContactPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const steps = [
    {
      icon: FaUser,
      field: "name",
      placeholder: "Votre nom",
      type: "text",
    },
    {
      icon: FaEnvelope,
      field: "email",
      placeholder: "Votre email",
      type: "email",
    },
    {
      icon: FaCommentDots,
      field: "message",
      placeholder: "Votre message",
      type: "textarea",
    },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/90" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Nous contacter
          </h2>
          <p className="text-center text-gray-300 mb-8 text-sm">
            Une question ? Nous sommes à votre écoute.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {steps[step - 1].icon({
                    className: "text-indigo-400 text-lg",
                  })}
                </div>
                {steps[step - 1].type === "textarea" ? (
                  <textarea
                    name={steps[step - 1].field}
                    placeholder={steps[step - 1].placeholder}
                    value={formData[steps[step - 1].field]}
                    onChange={handleChange}
                    rows="4"
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                ) : (
                  <input
                    type={steps[step - 1].type}
                    name={steps[step - 1].field}
                    placeholder={steps[step - 1].placeholder}
                    value={formData[steps[step - 1].field]}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                )}
              </div>
            </motion.div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    step === index + 1
                      ? "bg-indigo-500 scale-125"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-2 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Précédent
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Envoyer
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
