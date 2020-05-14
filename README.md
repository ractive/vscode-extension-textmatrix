# textmatrix Extension

This simple extension treats the text of the active text editor document as a matrix (where elements are separated by whitespace) and offers some simple matrix operations.

https://marketplace.visualstudio.com/items?itemName=ractive.textmatrix

![textedit extension in action](textmatrix-vscode-extension.gif)

To apply an operation, open the command palette in vscode (`F1` or `ctrl-shift-p`) and search for one of the commands described below.

Be aware that the text in the currently active editor window (representing a matrix), is replaced with the result of the matrix operation.

The text must represent a rectangular matrix with the exact same amout of elements on each line, separated by whitespace. A simple, valid matrix e.g. is:
```
1 2 3
4 5 6
```
or
```
1    2 3    4
  5 6 7   8
```
The resulting matrix of the operation is always printed out with one space between every element.

The available commands in vscode are:

## Transpose text
Transposes the rows and columns of the text:
```
1 2 3
4 5 6
```
becomes:
```
1 4
2 5
3 6
```

## Flip the characters on every line of the text
Flips the elements on each row (x axis):
```
1 2 3
4 5 6
```
becomes:
```
3 2 1
6 5 4
```

## Flip the lines of the text
Flips the lines of the text:
```
1 2 3
4 5 6
7 8 9
```
becomes:
```
7 8 9
4 5 6
1 2 3
```

## Rotate text by 90 degrees
Rotates the matix by 90 degrees:
```
1 2 3
4 5 6
```
becomes:
```
4 1
5 2
6 3
```

## Rotate text by 180 degrees
Rotates the matix by 180 degrees:
```
1 2 3
4 5 6
```
becomes:
```
6 5 4
3 2 1
```

## Rotate text by 270 degrees
Rotates the matix by 270 degrees:
```
1 2 3
4 5 6
```
becomes:
```
3 6
2 5
1 4
```

## Usage
This extension can be used to manipulate images in https://arcade.makecode.com. Copy/paste an image as text (from the javascript source) to a vscode window and flip it or rotate it easily with on of the matrix operations.
