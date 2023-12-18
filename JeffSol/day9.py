def all_zeros(nums):
    for nummy in nums:
        if nummy != 0:
            return False

    return True

def part1():
    with open("inputs/day9.txt") as file:
        rows = [row.strip() for row in file.readlines()]
        sequences = [list(map(int, row.split(" "))) for row in rows]

        '''
        Check if the sequence contains all zeros
        If not, then we need to find the difference for the sequence to generate a new subsequence
        Keep repeating this until we get all zeros
        
        Then, take each sequence and extrapolate
        Take the next sequence and add the last value of the prev sequence to extrapolate
        Repeat until we get to the original sequence
        The last value of the first sequence will be the next value that we need
        '''
        extrapolated_values = []

        for seq in sequences:
            sub_sequences = []
            sub_sequences.append(seq)
            next_sub_sequence = []

            while not all_zeros(sub_sequences[-1]):
                idx = 1
                for num in sub_sequences[-1][1:]:
                    next_sub_sequence.append(num - sub_sequences[-1][idx - 1])
                    idx += 1
                sub_sequences.append(next_sub_sequence)
                next_sub_sequence = []

            for i in range(len(sub_sequences) - 2, -1, -1):
                sub_sequences[i].append(sub_sequences[i][-1] + sub_sequences[i+1][-1])

            extrapolated_values.append(sub_sequences[0][-1])

        print(sum(extrapolated_values))

def part2():
    with open("inputs/day9.txt") as file:
        rows = [row.strip() for row in file.readlines()]
        sequences = [list(map(int, row.split(" "))) for row in rows]

        '''
        Check if the sequence contains all zeros
        If not, then we need to find the difference for the sequence to generate a new subsequence
        Keep repeating this until we get all zeros
        
        Then, take each sequence and extrapolate
        Take the next sequence and add the last value of the prev sequence to extrapolate
        Repeat until we get to the original sequence
        The last value of the first sequence will be the next value that we need
        '''
        extrapolated_values = []

        for seq in sequences:
            sub_sequences = []
            sub_sequences.append(seq)
            next_sub_sequence = []

            while not all_zeros(sub_sequences[-1]):
                idx = 1
                for num in sub_sequences[-1][1:]:
                    next_sub_sequence.append(num - sub_sequences[-1][idx - 1])
                    idx += 1
                sub_sequences.append(next_sub_sequence)
                next_sub_sequence = []

            for i in range(len(sub_sequences) - 2, -1, -1):
                sub_sequences[i].insert(0, sub_sequences[i][0] - sub_sequences[i+1][0])

            extrapolated_values.append(sub_sequences[0][-1])

        print(sum(extrapolated_values))

part2()