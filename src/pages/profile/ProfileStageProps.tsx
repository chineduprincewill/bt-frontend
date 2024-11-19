import { UpdateProfileFlowStages } from '../../state/slices/profileSlice';
import { UserInfoFromApi } from '../../api/authApi';

export interface ProfileStageProps {
    nextStage: () => void;
    user: UserInfoFromApi;
    stageToStartFrom?: UpdateProfileFlowStages;
    mode: 'edit' | 'create'
}
