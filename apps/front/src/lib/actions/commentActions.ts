"use server";

import { authFetchGraphQl, fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { CREATE_COMMENT_MUTATION, GET_POST_COMMENTS } from "../gqlQueries";
import { CommentEntity } from "../types/modelTypes";
import { CreateCommentFormState } from "../types/formState";
import { CommentFormSchema } from "../zodSchemas/commentFromSchema";
import { z } from "zod";

export async function getPostComments({
  postId,
  skip,
  take,
}: {
  postId: number;
  skip: number;
  take: number;
}) {
  const data = await fetchGraphQL(print(GET_POST_COMMENTS), {
    postId,
    take,
    skip,
  });
  return {
    comments: data.getPostComments as CommentEntity[],
    count: data.postCommentCount as number,
  };
}

export async function saveComment(
  state: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const validatedFields = CommentFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success)
    return {
      data: Object.fromEntries(formData.entries()),
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };

  const data = await authFetchGraphQl(print(CREATE_COMMENT_MUTATION), {
    input: {
      ...validatedFields.data,
    },
  });

  if (data)
    return {
      message: "Success! Your Comment saved!",
      ok: true,
      open: false,
    };

  return {
    message: "Oops! Something went wrong",
    ok: false,
    open: true,
    data: Object.fromEntries(formData.entries()),
  };
}
