import React from "react";
import ModalWrapper from "./ModalWrapper";
import { FaTimesCircle } from "react-icons/fa";
import { StoreContext } from "../../../store/StoreContext";
import { setIsAdd } from "../../../store/StoreAction";

const ModalAddUser = ({
	handleSubmit,
	email,
	name,
	setName,
	setEmail,
	is_Active,
	setIs_Active,
}) => {
	// store variables:
	const { dispatch, store } = React.useContext(StoreContext);
	const handleClose = () => dispatch(setIsAdd(false));
	return (
		<>
			<ModalWrapper position={"center"}>
				<div className='main-modal w-[400px] bg-primary text-content h-auto  rounded-xl '>
					<div className='bg-accent w-full flex items-center text-center px-4 rounded-t-xl text-primary justify-between'>
						<h4 className='mb-0 py-2 text-primary '>Add Employee</h4>
						<button
							className='text-xl text-primary'
							onClick={handleClose}>
							<FaTimesCircle />
						</button>
					</div>
					<div className='modal-body p-4'>
						<div className='bg-primary '>
							<form
								onSubmit={handleSubmit}
								className='input-wrapper flex flex-col  items-center gap-2 py-5'>
								<input
									type='text'
									placeholder='Name'
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								<input
									type='email'
									placeholder='Email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>

								<div className='flex flex-row gap-2 py-5 w-2/3'>
									<p className='mb-0 pt-1'>Status:</p>
									<select
										name='is_Active'
										onChange={(e) => setIs_Active(e.target.value)}
										value={is_Active}>
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
										className='btn btn-form btn--add'
										type='submit'>
										Add User
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

export default ModalAddUser;
