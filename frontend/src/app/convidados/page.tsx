import ConvidadosList from "../components/forms/ConvidadosList";

const Convidados = () => {
    return (
        <div className="lg:pl-40 h-full lg:block mt-4">
            <div className="text-2xl font-semibold">Convidados</div>
            <ConvidadosList />
        </div>
    )
}

export default Convidados;