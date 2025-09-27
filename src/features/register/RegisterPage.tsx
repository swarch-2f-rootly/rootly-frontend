import RegisterForm from './RegisterForm';
import Carousel from '../../components/common/Carousel';

const RegisterPage = () => (
  <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
    <Carousel />
    <div className="relative z-10">
      <RegisterForm />
    </div>
    <div className="absolute inset-0 bg-black/30 z-0" />
  </div>
);

export default RegisterPage;
