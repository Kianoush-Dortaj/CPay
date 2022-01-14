import OperationResult from "../../../core/Operation/OperationResult";
import { IUserVerificationRepository } from "./IUserVerificationRepository";
import { UserVerificationEntitie } from "../../Context/UserVerification/UserVerification";
import { FilterViewModel } from "../../../DTO/Common/FilterViewModel";
import { UserVerificationGetAll } from "../../../DTO/UserVerification/user-verification-getall.model";
import { GetAllPagingModel } from "../../../DTO/Share/GetAllPaging";
import { UserVerificationDetail } from "../../../DTO/UserVerification/user-verification-detail.model";
import { Status } from "../../../DTO/Common/Status.enum";

export default class UserVerificationRepository implements IUserVerificationRepository {


    async getUServerificationList(items: FilterViewModel<any>): Promise<OperationResult<GetAllPagingModel<UserVerificationGetAll>>> {

        try {
            const query: any = [];
            const getAllModel: UserVerificationGetAll[] = [];

            Object.keys(items.filters).forEach(key => {
                const value = items.filters[key as keyof any];
                if (key === 'name' && value) {
                    query.push({ name: { $regex: `(.*)${value}(.*)` } });
                } else {
                    query.push({ [key]: value });
                }
            });

            let userList = await UserVerificationEntitie.find(...query)
                .sort({ createdAt: -1 })
                .populate("userId").skip((items.page - 1) * items.pageSize)
                .limit(items.pageSize);

            let count = await UserVerificationEntitie.find({})
                .estimatedDocumentCount();

            userList.forEach(data => {

                getAllModel.push({
                    birthDate: data.birthDate,
                    id: data.id,
                    nationalName: data.nationality,
                    status: data.status,
                    typeVerification: data.typeVerification,
                    createAt: data.createdAt,
                    updateAd: data.updateAt,
                    userInfo: {
                        email: data.userId.email,
                        firstName: data.userId.firstName,
                        lastName: data.userId.lastName,
                        userAvatar: data.userId.avatar,
                        userId: data.userId.id
                    }
                })
            })

            return OperationResult.BuildSuccessResult<GetAllPagingModel<any>>('Operation Success', {
                count: count,
                data: getAllModel
            });
        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

    async getUServerificationById(id: string): Promise<OperationResult<UserVerificationDetail>> {

        try {

            let userVerificationDetail = await UserVerificationEntitie.findById(id)
                .populate("userId")

            if (userVerificationDetail) {
                return OperationResult.BuildSuccessResult('Operation Success', {
                    backImage: userVerificationDetail.backImage,
                    birthDate: userVerificationDetail.birthDate,
                    frontImage: userVerificationDetail.frontImage,
                    id: userVerificationDetail.id,
                    image: userVerificationDetail.image,
                    nationalName: userVerificationDetail.nationality,
                    selfieImage: userVerificationDetail.selfieImage,
                    status: userVerificationDetail.status,
                    typeVerification: userVerificationDetail.typeVerification,
                    createAt: userVerificationDetail.createdAt,
                    updateAd: userVerificationDetail.updateAt,
                    userInfo: {
                        confirmEmail: userVerificationDetail.userId.confirmEmail,
                        confirmPhoneNumber: userVerificationDetail.userId.confirmPhoneNumber,
                        email: userVerificationDetail.userId.email,
                        firstName: userVerificationDetail.userId.firstName,
                        lastName: userVerificationDetail.userId.lastName,
                        phoneNumber: userVerificationDetail.userId.phoneNumber,
                        userAvatar: userVerificationDetail.userId.avatar,
                        userId: userVerificationDetail.userId.id
                    }
                });
            }
            return OperationResult.BuildFailur("we can not find this user verification");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

    async GetById(id: string): Promise<OperationResult<any>> {

        try {

            let userVerificationDetail = await UserVerificationEntitie.findById(id)
                .populate("userId")

            if (userVerificationDetail) {
                return OperationResult.BuildSuccessResult('Operation Success', userVerificationDetail);
            }
            return OperationResult.BuildFailur("we can not find this user verification");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

    async changeUserVerificationStatus(id: string, status: Status, description: string): Promise<OperationResult<boolean>> {

        try {

            let userVerificationDetail = await UserVerificationEntitie.updateOne({
                _id: id
            }, {
                $set: {
                    status: status,
                    description: description
                }
            });

            if (userVerificationDetail) {
                return OperationResult.BuildSuccessResult('Operation Success', true);
            }
            return OperationResult.BuildFailur("we can not find this user verification");

        } catch (error: any) {
            return OperationResult.BuildFailur(error.message);

        }


    }

}