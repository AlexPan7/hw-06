import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import {addCashAction, getCashAction} from "./store/cashReducer"
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer"
import {RootState, Customer} from "./store/types"

function App() {
	const dispatch = useDispatch()
	const cash = useSelector((state: RootState) => state.cash.cash)

	const customers = useSelector((state: RootState) => state.customers.customers)

	const addCash = (cash: number) => {
		dispatch(addCashAction(cash))
	}

	const getCash = (cash: number) => {
		dispatch(getCashAction(cash))
	}

	const addCustomer = (name: string) => {
		if (!name) {
			alert("Customer name is empty");
			return;
		}
	
		const customer: Customer = {
			id: uuidv4(),
			name,
		};
		dispatch(addCustomerAction(customer));
	};
	
	const removeCustomer = (id: number) => {
		dispatch(removeCustomerAction(id))
	}

	return (
		<div>
			<div>
				<h1>{cash}</h1>
				<button onClick={()=>{addCash(Number(prompt()))}}>ADD</button>
				<button onClick={()=>{getCash(Number(prompt()))}}>GET</button>
			</div>
			<br />
			<div>
				<button onClick={()=>{addCustomer(String(prompt()))}}>Add Customer</button>
				<ul>
					{
						customers.length > 0 ? (
							customers.map((customer: any) => (
									<li key={customer.id}><strong>{customer.name}</strong> - <button onClick={()=>{removeCustomer(customer.id)}}>Remove Customer</button></li>
								))
							) : (
								<li> No customers...</li>
							)
						}
				</ul>
			</div>
		</div>
	);
}

export default App;
