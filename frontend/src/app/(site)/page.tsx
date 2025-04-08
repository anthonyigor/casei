import { Great_Vibes } from "next/font/google";
import AuthForm from "../components/forms/AuthForm";

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });

export default function Home() {
  return (
    <div id="container-home">
      <div className="fixed inset-0 flex items-center justify-center">
        <div id="content-home" className="sm:mx-auto sm:w-full sm:max-w-xs rounded-md">
          <div className={greatVibes.className}>
            <h2 className="text-5xl text-violet-600 font-semibold py-2">Casei</h2>
          </div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
