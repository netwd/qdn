import React from 'react';
import Head from 'next/head'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Router from 'next/router'


  const searchQuery = event => {
    event.preventDefault() 
    Router.push({
      pathname: '/pages/search',
      query: { query:  event.target.query.value },
    })
}

export class NavBar extends React.Component {
  state = {
    loggedin: false,
  }
  componentDidMount() {
    let aT= sessionStorage.getItem('accessToken')
    if (aT) {
        this.setState({loggedin: true})
    }
    
  }
render() {
    return (
        <div>
            <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Network</title>
        </Head>
          {this.state.loggedin ?
    <nav class="from-yellow-400 to-orange-500">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <a href="/"><span class="text-2xl flex-shrink-0 flex items-center decoration-clone bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 to-red-500">
        Network 
        </span></a>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a href="/" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
  
              <a href="/pages/Events" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Events</a>
  
              <a href="/pages/Artists" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Artists</a>
  
              <a href="/pages/Library/" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Library</a>
              <a href="/pages/Videos/" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">All Video's</a>
              <a href="/pages/Radio/" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Radio</a>
              <a href="/pages/Inbox/" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inbox</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          
  
          <div class="ml-3 relative">
            <div>
            <form className="d-flex" onSubmit={searchQuery}>
                 <input className="form-control me-2" class="rounded-l-lg py-2 px-6 text-black border border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent" id="query" type="search" placeholder="Search" aria-label="Search"/>
                 <button className="btn" class="rounded-r-lg bg-yellow-600 hover:bg-yellow-700 py-2 px-6" type="submit">Search</button>
             </form>
             
            </div>

            
          </div>
          <div class="ml-3 relative float-right">
          <a href="/logout"><button class="text-white font-bold py-2 px-4 rounded-full bg-yellow-600 hover:bg-yellow-700">
            <ExitToAppIcon/> Log Out
          </button></a>
          </div>
        </div>
      </div>
    </div>
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a href="/" class="text-gray-300 hover:bg-yellow-600 bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Home</a>
        <a href="/pages/Events" class="text-gray-300 hover:bg-yellow-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Events</a>
        <a href="/pages/Artists" class="text-gray-300 hover:bg-yellow-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Artists</a>
        <a href="/pages/Library/" class="text-gray-300 hover:bg-yellow-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Library</a>
        <a href="/pages/Videos/" class="text-gray-300 hover:bg-yellow-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">All Video's</a>
        <a href="/pages/Radio/" class="text-gray-300 hover:bg-yellow-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Radio</a>
      </div>
    </div>
  </nav>
    : 
    <nav class="from-yellow-400 to-orange-500">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <span class="text-2xl flex-shrink-0 flex items-center decoration-clone bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 to-red-500">
            Network
          </span>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a href="/" class="text-gray-300 hover:bg-yellow-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          
        </div>
      </div>
    </div>
    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a href="/" class="text-gray-300 hover:bg-yellow-600 bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">Login</a>
      </div>
    </div>
  </nav>}
        </div>
      );
}
}


  

