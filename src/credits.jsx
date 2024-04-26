
import { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from './modal';

function Credits({ id }) {
    const [credits, setCredits] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        const response = await axios.get(
          'https://recruiting.api.bemmbo.com/invoices/pending'
        );
        setCredits(response.data);
      }
      getData();
    }, []);
    
    return (
    
    <div className="grid place-items-center pt-6">
        <div className="items-stretch flex-grow">
            <h1 className="text-xl items-center font-semibold text-gray-900 dark:text-black">
            Selecciona una nota de crédito
            </h1>
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <tbody>
                {credits.filter(credit => credit.type === 'credit_note' && credit.reference === id).map((credit) => (
                <tr onClick={() => setSelectedRowId(credit.id)} className="bg-white border-b light:border-gray-700 text-black">
                    <th scope="row" className="px-6 py-4 font-medium text-gray whitespace-nowrap dark:text-white">
                    <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 light:ring-offset-gray focus:ring-2 bg-white dark:border-gray-600"/>
                    </th>
                    <td className="px-6 py-4">
                        ${credit.amount}
                    </td>
                    <td className="px-6 py-4">
                        {credit.currency}
                    </td>
                    <td className="px-6 py-4">
                        {credit.type}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            {<Modal/>}
        </div>
    </div>
    );
}

export default Credits;