import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { PiArchive } from "react-icons/pi";
import ModalWrapper from "./ModalWrapper";

import { setIsActive, setIsArchive } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { FaTimesCircle } from "react-icons/fa";

const ModalArchive = ({
	handleStatusEdit,
	position = "center",
	users,
	setEditIs_Active,
	editIs_Active,
}) => {
	const { dispatch, store } = React.useContext(StoreContext);
	const handleClose = () => dispatch(setIsArchive(false));
	return (
		<>
			<ModalWrapper position={position}>
				<div className='main-modal w-[400px] bg-primary text-content h-auto  rounded-xl '>
					<div className='bg-accent w-full flex items-center text-center px-4 rounded-t-xl text-primary justify-between'>
						<h4 className='mb-0 py-2 text-primary '>Change Status of user?</h4>
						<button
							className='text-xl text-primary'
							onClick={handleClose}>
							<FaTimesCircle />
						</button>
					</div>
					<div className='modal-body p-4'>
						<div className='bg-primary '>
							<form
								onSubmit={handleStatusEdit}
								className='input-wrapper flex flex-col  items-center gap-2 py-5'>
								<div className='flex flex-row gap-2 py-5 w-2/3'>
									<p className='mb-0 pt-1'>Status:</p>
									<select
										name='is_Active'
										onChange={(e) => setEditIs_Active(e.target.value)}
										value={editIs_Active}>
										<option hidden>Is Active?</option>
										<option value='1'>Active</option>
										<option value='0'>Inactive</option>
									</select>
								</div>
								<div className='w-full flex items-center gap-2 px-10 jusitfy-center'>
									<button
										className='btn btn-form btn--close text-primary'
										onClick={handleClose}>
										Close
									</button>
									<button
										className='btn btn-form btn--edit'
										type='submit'>
										Confirm
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
};

export default ModalArchive;
