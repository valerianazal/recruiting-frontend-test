
import { useEffect, useState } from 'react'
import axios from 'axios'
import Credits from './credits'

function Bills() {
    const [bills, setBills] = useState([]);
    const [selectedRowId, setSelectedRowId] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        const response = await axios.get(
          'https://recruiting.api.bemmbo.com/invoices/pending'
        );
        setBills(response.data);
      }
      getData();
    }, []);
  
    return (
    <div className="grid place-items-center pt-6">
    <div className="items-stretch flex-grow">
      <h1 className="text-xl items-center font-semibold text-gray-900 dark:text-black">
        Selecciona una factura
      </h1>
  
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {bills.filter(bill => bill.type === 'received').map((bill) => (
              <tr onClick={() => setSelectedRowId(bill.id)} key={bill.id} className="bg-white border-b light:border-gray-700 text-black">
                <th scope="row" className="px-6 py-4 font-medium text-gray whitespace-nowrap dark:text-white">
                  <input id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 light:ring-offset-gray focus:ring-2 bg-white dark:border-gray-600"/>
                </th>
                <td className="px-6 py-4">
                    ${bill.amount}
                </td>
                <td className="px-6 py-4">
                    {bill.currency}
                </td>
                <td className="px-6 py-4">
                    {bill.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
    <div>
        {selectedRowId && <Credits id={selectedRowId} />}
    </div>
    </div>
    );
  }

export default Bills;