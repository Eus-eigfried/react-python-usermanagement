import React from "react";
import ModalWrapper from "./ModalWrapper";
import { FaTimesCircle } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import { setIsEdit } from "../../../store/StoreAction";

const ModalEditUser = ({
	handleUpdate,
	setEditName,
	setEditEmail,
	setEditUserId,
	editName,
	editEmail,
}) => {
	// store components
	const { dispatch, store } = React.useContext(StoreContext);
	// handlers
	const handleClose = () => dispatch(setIsEdit(false));

	return (
		<>
			<ModalWrapper position={"center"}>
				<div className='main-modal w-[400px] bg-primary text-content h-auto  rounded-xl '>
					<div className='bg-accent w-full flex items-center text-center px-4 rounded-t-xl text-primary justify-between'>
						<h4 className='mb-0 py-2 text-primary '>Edit User</h4>
						<button
							className='text-xl text-primary'
							onClick={handleClose}>
							<FaTimesCircle />
						</button>
					</div>
					<div className='modal-body p-4'>
						<div className='bg-primary '>
							<form
								onSubmit={handleUpdate}
								className='input-wrapper'>
								<div className=' flex flex-col  items-center gap-2 py-5 px-10'>
									<input
										type='text'
										placeholder='Name'
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
										required
									/>
									<input
										type='email'
										placeholder='Email'
										value={editEmail}
										onChange={(e) => setEditEmail(e.target.value)}
										required
									/>
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
										Edit User
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

export default ModalEditUser;
