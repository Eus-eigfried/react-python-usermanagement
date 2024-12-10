import React from "react";
import SearchParam from "./SearchParam";
import {
	FaDatabase,
	FaPlus,
	FaSortAlphaDown,
	FaSortAmountDown,
	FaSortNumericDown,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Theme from "../../partials/functions/Theme";


const TableContent = ({ handleSearch, handleAdd, handleSortByName }) => {
	return (
		<>
			<div className='MainTable'>
				<div className='container'>
					{/* Form for adding a new user */}
					{/* Search Component */}
					<div className='w-full flex items-center gap-2 justify-between'>
						<div className='w-1/2'>
							<SearchParam handleSearch={handleSearch} />
						</div>
						<div className='w-1/2 flex items-center flex-row gap-2 justify-end'>
							<button
								className='btn-add bg-accent text-primary w-1/4'
								type='submit'
								onClick={handleAdd}>
								<FaPlus />
								Add User
							</button>
							<button
								className='btn bg-accent text-primary w-1/3 btn-add'
								onClick={handleSortByName}>
								{localStorage.getItem("sortName") === "preSorted" ? (
									<>
										<FaSortAlphaDown />
										Sort By Name
									</>
								) : (
									<>
										<FaSortNumericDown />
										Sort By ID (Status)
									</>
								)}
							</button>
							<Theme/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TableContent;
