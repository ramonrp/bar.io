import React from 'react';
import { IconButton } from '@material-ui/core';
import { AddCircleOutlined } from '@material-ui/icons';
import { ItemCardComponent } from './item-card.component';

interface AddItemComponentProps {
  onCancel: () => void;
  onSave: (value: string, id?: string) => void;
  onAdd: () => void;
  isAdding: boolean;
}

export const AddItemComponent: React.FunctionComponent<AddItemComponentProps> = (props) => {
  const { onCancel, onSave, onAdd, isAdding } = props;
  return (
    <>
      <IconButton aria-label='Añadir' onClick={onAdd} disabled={isAdding}>
        <AddCircleOutlined fontSize='large' />
      </IconButton>
      {isAdding && <ItemCardComponent value='' edit={true} onCancel={onCancel} onSave={onSave} />}
    </>
  );
};
