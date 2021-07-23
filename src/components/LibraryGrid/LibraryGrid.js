import React from 'react';
import {LibraryPreview} from '../LibraryPreview/LibraryPreview';


export function LibraryGrid(props) {
  
  if (!props.Librarys || !props.Librarys.length) {

    return <div/>;
  }
  
  const gridItems = props.Librarys.map(Library => {
    return (
      
      <div>
      <LibraryPreview title={Library.title}
                          id={Library.id}
                          thumbnail={Library.thumbnail}
                          type={Library.type}
                          subscription={Library}/>
      </div>
    
    );
  });

  return (
    <div>
      <div class="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2">
        {gridItems}
      </div>
    </div>
  );

  }
