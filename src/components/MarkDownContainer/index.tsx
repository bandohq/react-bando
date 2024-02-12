import BoxContainer from '@components/BoxContainer';
import Markdown from 'react-markdown';
import { ComponentProps } from 'react';

type MarkDownContainerProps = {
  content: string;
  sx?: ComponentProps<typeof BoxContainer>['sx'];
};

export default function MarkDownContainer({ content, sx }: MarkDownContainerProps) {
  return (
    <BoxContainer sx={sx}>
      <Markdown>{content}</Markdown>
    </BoxContainer>
  );
}
