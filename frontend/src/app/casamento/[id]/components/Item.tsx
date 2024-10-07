'use client'

import { Great_Vibes } from "next/font/google";
import { BsFillEnvelopeOpenHeartFill } from "react-icons/bs";
import { FaGift } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { TbGpsFilled } from "react-icons/tb"

interface ItemProps {
    icon: any,
    text: string,
    onClick: () => void
}

const greatVibes = Great_Vibes({ weight:'400', subsets: ['latin'] });

const iconDict: any = {
    local: <TbGpsFilled className="h-12 w-12 text-white"/>,
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
        <div className="flex flex-col items-center gap-1">
            <div className="flex flex-col items-center justify-center w-20 h-14 bg-teal-800 rounded-md" onClick={onClick}>
                {iconDict[icon]}
            </div>
            <div className={greatVibes.className}>
                <span className='text-teal-800 text-2xl font-semibold'>{text}</span>
            </div>
        </div>
    )
}

export default Item;
