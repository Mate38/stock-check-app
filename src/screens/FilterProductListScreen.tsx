import React, { useState } from 'react';
import { Label, ButtonContainer, ButtonText } from '../styles/CommonStyles';
import { FilterContainer, StyledInput, ButtonWrapper } from '../styles/FilterProductListStyles';

interface FilterProductListScreenProps {
  onClose: () => void;
  filterProducts: (description: string, barCode: string) => void;
}

const FilterProductListScreen: React.FC<FilterProductListScreenProps> = ({ onClose, filterProducts }) => {
  const [description, setDescription] = useState('');
  const [barCode, setBarCode] = useState('');

  const applyFilters = () => {
    filterProducts(description.trim(), barCode.trim());
    onClose();
  };

  return (
    <FilterContainer>
      <Label>Descrição:</Label>
      <StyledInput
        placeholder="Pesquisar por descrição"
        value={description}
        onChangeText={setDescription}
      />
      <Label>Código de Barras:</Label>
      <StyledInput
        keyboardType="numeric"
        placeholder="Pesquisar por código de barras"
        value={barCode}
        onChangeText={setBarCode}
      />
      <ButtonWrapper>
        <ButtonContainer onPress={applyFilters}>
          <ButtonText>Filtrar</ButtonText>
        </ButtonContainer>
        <ButtonContainer onPress={onClose} bgColor="#ccc">
          <ButtonText>Fechar</ButtonText>
        </ButtonContainer>
      </ButtonWrapper>
    </FilterContainer>
  );
};

export default FilterProductListScreen;
