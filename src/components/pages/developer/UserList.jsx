import React from "react";
import {
	LiaEdit,
	LiaFolder,
	LiaFolderOpen,
	LiaTrashAltSolid,
} from "react-icons/lia";
import { setIsLoading } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import TableLoader from "../modals/TableLoader";

const UserList = ({
	users,
	handleDelete,
	handleEdit,
	isLoading,
	handleDeleteModal,
	handleStatusEdit,
	handleStatusModal,
}) => {
	const adminMessages = ["n/a"];
	const { store, dispatch } = React.useContext(StoreContext);
	const isLoaded = () => {
		setTimeout(() => {
			dispatch(setIsLoading(false));
		}, 1000);
	};
	return (
		<>
			<div className='table-wrapper relative'>
				<table className='table-users '>
					<thead className='border-b border-content'>
						<tr className=' bg-content/10'>
							<th className='w-[50px]'>Id</th>
							<th className='w-[175px]'>Name</th>
							<th className='w-[175px]'>Email</th>
							<th className='w-[100px]'>Status</th>
							<th className='w-[100px]'>Time Created</th>
							<th className='w-[100px]'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.length === 0 && (
							<>
								<tr>
									<td>{adminMessages[0]}</td>
									<td>{adminMessages[0]}</td>
									<td>{adminMessages[0]}</td>
									<td>{adminMessages[0]}</td>
									<td>{adminMessages[0]}</td>
									<td>{adminMessages[0]}</td>
								</tr>
							</>
						)}
						{isLoading && (
							<tr>
								<td colSpan={7}>
									{isLoading && (
										<TableLoader
											onLoad={isLoaded()}
											count='20'
											cols='6'
										/>
									)}
								</td>
							</tr>
						)}
						{store.isLoading === false && (
							<>
								{users.map((user) => (
									<>
										<tr key={user.id}>
											<td>{user[0]}</td>
											<td>{user[1]}</td>
											<td>{user[2]}</td>
											<td>
												<p
													className={` mx-auto ${
														user[3] === 1
															? `bg-green-300 rounded-full px-3 w-fit mt-2 text-green-950`
															: `bg-red-300 rounded-full px-3 w-fit mt-2 text-red-950`
													}`}>
													{user[3] ? "Active" : "Inactive"}
												</p>
											</td>
											<td>{user[4]}</td>
											<td className='table-action'>
												<ul>
													<li>
														<button
															className='tooltip tools hover:bg-accent hover:text-primary transition-all duration-500'
															data-tooltip={`${
																user[3] === 0 ? "Unarchive" : "Archive"
															}`}
															onClick={() => handleStatusModal(user[0])}>
															{user[3] === 0 ? (
																<LiaFolderOpen />
															) : (
																<LiaFolder />
															)}
														</button>
													</li>
													{user[3] === 0 ? (
														<>
															<li>
																<button
																	className='tooltip tools hover:bg-accent hover:text-primary transition-all duration-500'
																	data-tooltip='Delete'
																	onClick={() => handleDeleteModal(user[0])}>
																	<LiaTrashAltSolid />
																</button>
															</li>
														</>
													) : (
														<>
															<li>
																<button
																	className='tooltip tools hover:bg-accent hover:text-primary transition-all duration-500'
																	onClick={() => handleEdit(user[0])}
																	data-tooltip='Edit'>
																	<LiaEdit />
																</button>
															</li>
														</>
													)}
												</ul>
											</td>
										</tr>
									</>
								))}
							</>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default UserList;
