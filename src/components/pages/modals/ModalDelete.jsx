import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { setIsDelete } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import ModalWrapper from "./ModalWrapper";

const ModalDelete = ({ handleDelete }) => {
	// store variables:
	const { dispatch, store } = React.useContext(StoreContext);
	const handleClose = () => dispatch(setIsDelete(false));

	return (
		<>
			<div>
				<ModalWrapper position={"center"}>
					<div className='main-modal w-[400px] bg-primary text-content h-auto  rounded-xl '>
						<div className='bg-accent w-full flex items-center text-center px-4 rounded-t-xl text-primary justify-between'>
							<h4 className='mb-0 py-2 text-primary '>Delete current user?</h4>
							<button
								className='text-xl text-primary'
								onClick={handleClose}>
								<FaTimesCircle />
							</button>
						</div>
						<div className='modal-body p-4'>
							<div className='bg-primary text-center'>
								<form
									className='input-wrapper flex flex-col  items-center gap-2 py-5'
									onSubmit={handleDelete}>
									<div className='w-full flex items-center gap-2 px-10 jusitfy-center'>
										<button
											className='btn btn-form btn--close text-primary'
											onClick={handleClose}>
											Close
										</button>
										<button
											className='btn btn-form btn--edit'
											type='submit'>
											Delete User
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</ModalWrapper>
			</div>
		</>
	);
};

export default ModalDelete;
