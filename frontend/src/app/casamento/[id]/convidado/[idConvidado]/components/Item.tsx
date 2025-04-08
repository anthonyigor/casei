'use client'

import { Great_Vibes } from "next/font/google";
import { BsFillEnvelopeOpenHeartFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { TbGps } from "react-icons/tb"

interface ItemProps {
    icon: any,
    text: string,
    onClick: () => void
}

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });

const iconDict: any = {
    local: <TbGps className="h-12 w-12 text-white"/>,
    presenca: <GiConfirmed  className="h-10 w-10 text-white"/>,
    convite: <BsFillEnvelopeOpenHeartFill className="h-10 w-10 text-white"/>,
    presentes: <FaGift className="h-10 w-10 text-white"/>
}

const Item: React.FC<ItemProps> = ({
    icon,
    text,
    onClick
}) => {
    return (
        <div className="flex flex-col items-center gap-2"> {/* Ajuste o gap aqui */}
            {/* Caixa do ícone */}
            <div
                className="flex items-center justify-center w-20 h-14 bg-violet-800 rounded-md cursor-pointer"
                onClick={onClick}
            >
                <div className="flex items-center justify-center w-full h-full"> {/* Garantindo centralização */}
                    {iconDict[icon]}
                </div>
            </div>

            {/* Texto abaixo do ícone */}
            <div className={`${greatVibes.className} leading-none`}> {/* Ajuste do line-height */}
                <span className='text-violet-800 text-2xl font-semibold text-center whitespace-pre-wrap'>{text}</span>
            </div>
        </div>
    );
};


export default Item;
