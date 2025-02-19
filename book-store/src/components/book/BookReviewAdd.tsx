import Button from "components/common/Button";
import { BookReviewItemWrite } from "models/book.model";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface BookReviewAddProps {
  onAdd: (data: BookReviewItemWrite) => void;
}

function BookReviewAdd({ onAdd }: BookReviewAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  const handleAdd = (data: BookReviewItemWrite) => {
    onAdd(data);
  };

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea {...register("content", { required: true })}></textarea>
          {errors.content && <p className="error-text"></p>}
        </fieldset>
        <div className="submit">
          <fieldset>
            <select
              {...register("score", { required: true, valueAsNumber: true })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </fieldset>
          <Button size="medium" scheme="primary">
            Post
          </Button>
        </div>
      </form>
    </BookReviewAddStyle>
  );
}

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: end;

      .error-text {
        color: red;
        margin: 0;
      }
    }

    textarea {
      width: 100%;
      height: 100px;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: ${({ theme }) => theme.color.border};
      padding: 12px;
    }

    .submit {
      display: flex;
      justify-content: end;
    }
  }
`;

export default BookReviewAdd;
