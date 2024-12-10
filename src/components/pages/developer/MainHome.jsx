import axios from "axios";
import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import DbHeader from "../../partials/header/DbHeader";
import ModalEditUser from "../modals/ModalEditUser";
import ModalAddUser from "../modals/ModalAddUser";
import { StoreContext } from "../../../store/StoreContext";
import {
	setIsAdd,
	setIsDelete,
	setIsEdit,
	setIsLoading,
	setMessage,
	setSuccess,
	setError,
	setIsArchive,
} from "../../../store/StoreAction";
import Toast from "../modals/Toast";
import TableContent from "./TableContent";
import ModalError from "../modals/ModalError";
import ModalDelete from "../modals/ModalDelete";
import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalArchive from "../modals/ModalArchive";

const MainTable = () => {
	const [users, setUsers] = React.useState([]);
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [is_Active, setIs_Active] = React.useState();
	const [timeCreated, setTimeCreated] = React.useState();
	// for search
	const [filteredUsers, setFilteredUsers] = React.useState([]);
	// State for editing a user
	const [editUserId, setEditUserId] = React.useState(null); // Track which user is being edited
	const [editName, setEditName] = React.useState("");
	const [editEmail, setEditEmail] = React.useState("");
	const [editIs_Active, setEditIs_Active] = React.useState();
	// is being archived:
	const [statusId, setStatusId] = React.useState("");
	// is being deleted
	const [deleteId, setDeleteId] = React.useState("");
	// store contents:
	const { store, dispatch } = React.useContext(StoreContext);

	React.useEffect(() => {
		// localStorage for sorters:
		localStorage.setItem("sortName", "preSorted");
		axios
			.get("http://localhost:5000/users")
			.then((response) => {
				setUsers(response.data);
				setFilteredUsers(response.data); // Initialize filtered users with all users
				// store
				dispatch(setIsLoading(true));
			})
			.catch((error) =>
				console.error("There was an error fetching the users!", error)
			);
	}, []);

	// Handle search functionality
	const handleSearch = (searchTerm) => {
		if (!searchTerm) {
			setFilteredUsers(users); // If no search term, show all users
		} else {
			const lowercasedSearchTerm = searchTerm.toLowerCase();
			const filtered = users.filter(
				(user) =>
					user[1].toLowerCase().includes(lowercasedSearchTerm) || // search by name
					user[2].toLowerCase().includes(lowercasedSearchTerm) // search by email
			);
			setFilteredUsers(filtered);
		}
	};

	//  Handle user create:
	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("http://localhost:5000/users", {
				name,
				email,
				is_Active,
				timeCreated,
			})
			.then(() => {
				// reset
				setName("");
				setEmail("");
				setIs_Active("");
				// refresh on add
				axios
					.get("http://localhost:5000/users")
					.then((response) => {
						setUsers(response.data);
						setFilteredUsers(response.data);
					})
					.catch((error) => {
						dispatch(setError(true));
						dispatch(setMessage("Create User failed!"));
						console.error("There was an error fetching the users!", error);
					});

				// Dispatch state updates
				dispatch(setIsAdd(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`Record has been successfully saved.`));
			})
			.catch((error) => {
				console.error("There was an error creating the user!", error);
			});
	};

	// Handle user deletion
	const handleDelete = (e, id = deleteId) => {
		e.preventDefault();
		const handleError = (message, error) => {
			dispatch(setError(true));
			dispatch(setMessage(message));
			console.error(error);
		};
		const updateUsers = () => {
			axios
				.get("http://localhost:5000/users")
				.then((response) => {
					setUsers(response.data);
					setFilteredUsers(response.data);
				})
				.catch((error) => handleError("Failed to fetch users!", error));
		};
		axios
			.delete(`http://localhost:5000/users/${id}`)
			.then(() => {
				setUsers(users.filter((user) => user.id !== id));
				setFilteredUsers(filteredUsers.filter((user) => user.id !== id));
				dispatch(setIsDelete(false));
				dispatch(setSuccess(true));
				dispatch(setMessage("Record Successfully Deleted"));
				updateUsers(); // Re-fetch users after deletion
			})
			.catch((error) => handleError("Delete failed!", error));
	};

	// Handle saving the edited user
	const handleUpdate = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/users/${editUserId}`, {
				name: editName,
				email: editEmail,
			})
			.then((response) => {
				axios
					.get("http://localhost:5000/users")
					.then((response) => {
						setUsers(response.data);
						setFilteredUsers(response.data);
					})
					.catch((error) => {
						console.error("There was an error fetching the users!", error);
					});
				// Clear the edit state
				setEditUserId(null);
				setEditName("");
				setEditEmail("");
				// Dispatch state updates
				dispatch(setIsEdit(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`Record has been successfully updated.`));
				// Re-fetch users after updating
				axios
					.get("http://localhost:5000/users")
					.then((response) => setUsers(response.data));
			})
			.catch((error) => {
				dispatch(setError(true));
				dispatch(setMessage("Create User failed!"));
				console.error("There was an error updating the user!", error);
			});
	};
	// Handle saving the edited user
	const handleStatusEdit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/users-active/${editUserId}`, {
				is_Active: editIs_Active,
			})
			.then((response) => {
				axios
					.get("http://localhost:5000/users")
					.then((response) => {
						setUsers(response.data);
						setFilteredUsers(response.data);
					})
					.catch((error) => {
						console.error("There was an error fetching the users!", error);
					});
				// Clear the edit state
				setEditUserId(null);
				setEditIs_Active("");
				// Dispatch state updates
				dispatch(setIsArchive(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`User's Status active has been altered`));
				// Re-fetch users after updating
				axios
					.get("http://localhost:5000/users")
					.then((response) => setUsers(response.data));
			})
			.catch(() => {
				dispatch(setError(true));
				dispatch(setMessage("Operation Failed: Status Alter"));
			});
	};

	// handle create-modal
	const handleAdd = () => {
		// callbacks via store folder (create)
		dispatch(setIsAdd(true));
	};
	// handle delete-modal
	const handleDeleteModal = (e) => {
		// callbacks via store folder (edit)
		dispatch(setIsDelete(true));
		setDeleteId(e);
	};
	// handle edit-modal
	const handleEdit = (id) => {
		// callbacks via store folder (edit)
		dispatch(setIsEdit(true));
		try {
			// Find the user to edit
			const userToEdit = users.find((user) => user.id === id);
			setEditUserId(id); // Set the id of the user being edited
			setEditName(userToEdit[1]); // Set the name of the user to edit
			setEditEmail(userToEdit[2]); // Set the email of the user to edit
		} catch (error) {
			// console.log(error.cause);
		}
	};
	const handleStatusModal = (id) => {
		// callbacks via store folder (edit)
		dispatch(setIsArchive(true));
		try {
			// Find the user to edit
			const userToEdit = users.find((user) => user.id === id);
			setEditUserId(id); // Set the id of the user being edited
			setEditIs_Active(userToEdit[3]); // Set the name of the user to edit
		} catch (error) {
			// console.log(error.cause);
		}
	};
	// Sorting function: by name
	const handleSortByName = () => {
		if (localStorage.getItem("sortName") === "preSorted") {
			const sortedUsers = [...filteredUsers].sort((a, b) => {
				// Assuming user[1] is the name field
				const nameA = a[1].toLowerCase(); // Convert name to lowercase for case-insensitive comparison
				const nameB = b[1].toLowerCase(); // Convert name to lowercase for case-insensitive comparison

				if (nameA < nameB) return -1; // a comes before b
				if (nameA > nameB) return 1; // b comes before a
				return 0; // names are equal
			});
			setFilteredUsers(sortedUsers); // Update filtered users with sorted data
			localStorage.setItem("sortName", "sorted");
		} else {
			localStorage.setItem("sortName", "preSorted");
			axios
				.get("http://localhost:5000/users")
				.then((response) => {
					setUsers(response.data);
					setFilteredUsers(response.data); // Initialize
				})
				.catch((error) =>
					console.error("There was an error fetching the users!", error)
				);
		}
	};

	return (
		<>
			<DbHeader />
			<div className='container'>
				<TableContent
					handleSearch={handleSearch}
					handleAdd={handleAdd}
					users={users}
					handleSortByName={handleSortByName}
				/>

				{/* Display filtered users */}
				<div className='w-full flex items-center gap-5 border-t-2 border-accent px-5 pt-2'>
					<div className='w-1/2 justify-start'>
						<h2>Master List</h2>
					</div>
					<div className='w-1/2 flex items-center gap-2 justify-end'>
						<p
							className={
								"rounded-lg btn-information bg-accent text-primary text-center gap-5 w-1/3 my-2"
							}>
							Entries Existing: {users.length}
						</p>
						<button className='btn btn-add bg-accent text-primary flex items-center  gap-2 justify-center w-1/3'>
							<FaDatabase />
							<Link
								to='http://localhost/phpmyadmin/index.php?route=/database/structure&db=crud_db'
								target='_blank'>
								Database Link
							</Link>
						</button>
					</div>
				</div>
				<UserList
					users={filteredUsers}
					handleDeleteModal={handleDeleteModal}
					handleDelete={handleDelete}
					handleEdit={handleEdit}
					handleStatusModal={handleStatusModal}
					isLoading={store.isLoading}
				/>
			</div>
			{store.isDelete && (
				<ModalDelete
					handleDelete={handleDelete}
					users={users}
				/>
			)}
			{store.isArchive && (
				<ModalArchive
					// function:
					handleStatusEdit={handleStatusEdit}
					// values:
					setEditIs_Active={setEditIs_Active}
					editIs_Active={editIs_Active}
					users={users}
				/>
			)}
			{store.isEdit && (
				<ModalEditUser
					// function pass
					handleUpdate={handleUpdate}
					// value pass
					setEditName={setEditName}
					setEditEmail={setEditEmail}
					setEditUserId={setEditUserId}
					editName={editName}
					editEmail={editEmail}
				/>
			)}
			{store.isAdd && (
				<ModalAddUser
					// function pass
					handleSubmit={handleSubmit}
					// value pass
					// text
					name={name}
					email={email}
					// email
					setName={setName}
					setEmail={setEmail}
					// bool
					is_Active={is_Active}
					setIs_Active={setIs_Active}
				/>
			)}

			{store.success && <Toast type='xl' />}
			{store.error && <ModalError position={"center"} />}
		</>
	);
};

export default MainTable;
