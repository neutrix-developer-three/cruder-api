
import { SetMetadata } from '@nestjs/common';
import { StaticRoutesPropsType } from 'src/modules/rbac/static-routes.props.type';

export const StaticRoutesProps = (props: StaticRoutesPropsType) => SetMetadata('staticRoutesProps', props);
