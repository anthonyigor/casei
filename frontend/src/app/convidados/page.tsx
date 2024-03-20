import ConvidadosForm from "../components/forms/ConvidadosForm";

const Convidados = () => {
    return (
        <div className="lg:pl-40 h-full lg:block mt-4">
            <div className="text-2xl font-semibold">Convidados</div>
            <ConvidadosForm />
        </div>
    )
}

export default Convidados;