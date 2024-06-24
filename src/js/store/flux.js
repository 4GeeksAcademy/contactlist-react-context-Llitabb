const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			userToEdit: {},
			editing: false
		},
		actions: {
			// Use getActions to call a function within a fuction
			getContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas/LlitaBB/contacts")
				.then( (response) => response.json())
				.then( data => setStore({ contacts: data.contacts }))	
			},
			deleteContact: (iDToDelete) => {
				fetch(`https://playground.4geeks.com/contact/agendas/LlitaBB/contacts/${iDToDelete}`, { method: 'DELETE' })
				.then( () => getActions().getContacts())
			},
			findMyUser : () => {
				fetch("https://playground.4geeks.com/contact/agendas?offset=0&limit=100")
				.then( (response) => response.json())
				.then( data => {
					const userExist = data.agendas.find (user => user.slug === "LlitaBB")
					if(!userExist) {
							fetch(`https://playground.4geeks.com/contact/agendas/LlitaBB`, { method: 'POST' })
							.then((response) => response.json())
							.then(console.log("Usuario creado"))
							.then( () => getActions().getContacts())
					} else console.log("El usuario ya existe")
				})
			},
			addContactsAPI: (name, phone, email, address) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					 })
				};
				fetch('https://playground.4geeks.com/contact/agendas/LlitaBB/contacts', requestOptions)
					.then(response => response.json())
					.then(() => getActions().getContacts())
			},
			editContact: (iDSelected) => {
				const userSelected = getStore().contacts.find(user => user.id === iDSelected)
				setStore({ userToEdit: userSelected })
				setStore({editing: true })
			},
			editContactAPI: (name, phone, email, address, iDToEdit) => {
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ 
						"name": name,
						"phone": phone,
						"email": email,
						"address": address
					 })
				};
				fetch(`https://playground.4geeks.com/contact/agendas/LlitaBB/contacts/${iDToEdit}`, requestOptions)
					.then(response => response.json())
					.then( setStore({ userToEdit: {} }))
					.then(() => getActions().getContacts())
			},
			setEditing: (value) => {
				setStore({ editing: value });
			  },
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				getActions().findMyUser()
				getActions().getContacts();
			},
		}
	};
};

export default getState;
